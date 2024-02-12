const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();

      return console.table(contactsList);

    case "get":
      const contacts = await getContactById(id);
      return console.table(contacts);

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.table(newContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.table(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
