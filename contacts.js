const fs = require("fs").promises;
const { table } = require("console");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const list = await listContacts();
    const contactById = list.find(item => item.id === contactId.toString());
    if (!contactById) {
      throw new Error("wrong contactId, please try again");
    }
    return contactById;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    console.log("contact removed");
    const list = await listContacts();
    const filteredList = list.filter(item => item.id !== contactId.toString());
    if (filteredList.length === list.length) {
      throw new Error("wrong contactId, please try again");
    }
    const dataString = JSON.stringify(filteredList);
    fs.writeFile(contactsPath, dataString);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await listContacts();
    const newList = [...list, { id: v4(), name, email, phone }];
    const dataString = JSON.stringify(newList);
    fs.writeFile(contactsPath, dataString);
    console.log("contact added");
    console.table(newList[newList.length - 1]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
