const terminal = document.getElementById('terminal');
const userInput = document.getElementById('user-input');
const suggestionsParagraph = document.getElementById('suggestions');

let showedCommandIndex = 0;
const commandsHistory = [];
let isCommandHistoryBrowsed = false;
let nextIndexToAdd = 0;
let terminalHistory = [];

const CUSTOM_COMMANDS = {
  hello: { msg: 'Hello :)' },
  goodbye: { msg: 'Goodbye :)' },
};

const COMMANDS = {
  clear,
  double,
  help,
  quote,
  ...CUSTOM_COMMANDS,
};

fillTerminalWithLoginDate();

userInput.addEventListener('keyup', async (event) => {
  if(event.key === 'Enter') {
    let command = event.target.value.trim();
    await enterCommand(command);
    resetCommandHistoryBrowsing();
    hideSuggestionsParagraph();
    return;
  }

  if(event.key === 'ArrowUp') {
    handleArrowUp();
    showSuggestions(event.target.value);
    return;
  }

  if(event.key === 'ArrowDown') {
    handleArrowDown();
    showSuggestions(event.target.value);
    return;
  }

  if(event.target.value.trim().length) {
    showSuggestions(event.target.value);
  } else {
    hideSuggestionsParagraph();
  }
  
  resetCommandHistoryBrowsing();
});

function resetCommandHistoryBrowsing() {
  showedCommandIndex = 0;
  isCommandHistoryBrowsed = false;
}

function hideSuggestionsParagraph() {
  suggestionsParagraph.classList.remove('terminal__suggestions--visible');
}

function showSuggestions(input) {
  let suggestions = 'Suggestions: ';
  const suggestedCommands = Object.keys(COMMANDS).filter(command => {
    return command.startsWith(input);
  });

  if(!suggestedCommands.length) {
    return;
  }

  suggestedCommands.forEach(command => {
    suggestions += `${command}, `;
  });

  parsedSuggestions = suggestions.slice(0, -2);
  suggestionsParagraph.innerText = parsedSuggestions;
  suggestionsParagraph.classList.add('terminal__suggestions--visible');
}

function handleArrowUp() {
  if(!commandsHistory.length) {
    return;
  }

  if(!isCommandHistoryBrowsed) {
    userInput.value = commandsHistory[showedCommandIndex];
    isCommandHistoryBrowsed = true;
    return;
  }

  if(showedCommandIndex + 1 >= commandsHistory.length) {
    showedCommandIndex = 0;
  } else {
    showedCommandIndex++;
  }

  userInput.value = commandsHistory[showedCommandIndex];
}

function handleArrowDown() {
  if(!commandsHistory.length) {
    return;
  }

  if(!isCommandHistoryBrowsed) {
    userInput.value = commandsHistory[showedCommandIndex];
    isCommandHistoryBrowsed = true;
    return;
  }
 
  if(showedCommandIndex - 1 < 0) {
    showedCommandIndex = commandsHistory.length - 1;
  } else {
    showedCommandIndex--;
  }

  userInput.value = commandsHistory[showedCommandIndex];
}

async function enterCommand(command) {
  if(command === '') {
    userInput.value = '';
    return;
  }

  let commandParam;
  let commandName = command;

  commandsHistory.push(command);
  terminalHistory.push(`you: ${command}`);

  if(command.startsWith('double ')) {
    commandParam = command.slice(7);
    commandName = 'double';
  }

  if(!COMMANDS[commandName]) {
    terminalHistory.push('Terminal: Unknown command');
    userInput.value = '';
    updateTerminal();
    return;
  } 

  const commandType = typeof(COMMANDS[commandName]);

  if(commandType === 'function') {
    await COMMANDS[commandName](commandParam);
  } else {
    const result = COMMANDS[commandName];
    terminalHistory.push(`Terminal: ${result.msg}`);
  }

  userInput.value = '';
  updateTerminal();
}

function clear() {
  terminal.textContent = '';
  terminalHistory = [];
  nextIndexToAdd = 0;
  fillTerminalWithLoginDate();
}

function help() {
  let commands = '';
  Object.keys(COMMANDS).sort().forEach(command => { 
    commands += `${command}, `;
  });
  terminalHistory.push(`Terminal: ${commands}`);
}

async function quote() {
  const fetchedQuote = await fetchQuote();
  terminalHistory.push(`Terminal: ${fetchedQuote.quote}`);
}

async function fetchQuote() {
  try {
    const quote = await fetch('https://dummyjson.com/quotes/random');
    const parsedQuote = await quote.json();
    return parsedQuote;
  } catch(error) {
    console.error(error)
  }
}

function double(input) {
  const parsedNumber = Number(input);
  return parsedNumber 
    ? terminalHistory.push(`Terminal: ${parsedNumber * 2}`)
    : terminalHistory.push('Given input is not a number');
}

function fillTerminalWithLoginDate() {
  const loginDate = `Last Login: ${new Date().toUTCString()}`;
  const paragraph = document.createElement('p');
  paragraph.innerText = loginDate;
  paragraph.classList.add('terminal__line');
  terminal.appendChild(paragraph);
}

function updateTerminal() {
  const terminalItemsToDisplay = terminalHistory.slice(nextIndexToAdd);
  terminalItemsToDisplay.forEach(item => {
    const paragraph = document.createElement('p');
    paragraph.innerText = item;
    paragraph.classList.add('terminal__line');
    terminal.appendChild(paragraph);
    nextIndexToAdd++;
  });
}
