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

  // 🔹 загрузка из localStorage при старте
  componentDidMount() {
    const saved = localStorage.getItem('contacts');

    if (saved) {
      this.setState({
        contacts: JSON.parse(saved),
      });
    }
  }

  // 🔹 сохранение в localStorage при изменении contacts
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addContact = (e) => {
    e.preventDefault();

    const { contacts, name, number } = this.state;

    const exists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert('Контакт уже существует');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState({
      contacts: [...contacts, newContact],
      name: '',
      number: '',
    });
  };

  deleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== id
      ),
    });
  };

  render() {
    const { contacts, filter, name, number } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
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
              value={name}
              onChange={this.handleChange}
              required
            />
          </label>

          <br />

          <label>
            Number
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
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
          value={filter}
          onChange={this.handleChange}
        />

        <ul>
          {filteredContacts.map(contact => (
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