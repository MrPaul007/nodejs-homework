const contacts = require("./contacts");
const { listContacts, getContactById, removeContact, addContact } = contacts;

const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(data => console.table(data));
      break;

    case "get":
      getContactById(id).then(data => console.table(data));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      getContactById(id).then(data => console.table(data));
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
