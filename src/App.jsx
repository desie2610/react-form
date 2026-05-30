import { Component } from 'react';
import { nanoid } from 'nanoid';
import './index.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addContact = e => {
    e.preventDefault();

    for (let contact of this.state.contacts) {
      if (contact.name.toLowerCase() === this.state.name.toLowerCase()) {
        alert('Контакт уже существует');
        return;
      }
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.setState({
      contacts: [...this.state.contacts, newContact],
      name: '',
      number: '',
    });
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const contacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase())
    );

    return (
      <>
        <h1>Phonebook</h1>

        <form onSubmit={this.addContact}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              required
            />
          </label>

          <br />

          <label>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              required
            />
          </label>

          <br />

          <button type="submit">Add contact</button>
        </form>
          <h2>Contacts</h2>

        <input
          type="text"
          placeholder="Search contact"
          name="filter"
          value={this.state.filter}
          onChange={this.handleChange}
        />

        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {contact.name} - {contact.number}
              <button onClick={() => this.deleteContact(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;