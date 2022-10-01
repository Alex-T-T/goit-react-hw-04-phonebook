import {useState, useEffect} from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';


    const initialContacts = [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];

export const App = () => {


    const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts) 

    const [filter, setFilter] = useState('');

    useEffect(() => {
        // console.log(prevContacts)
        console.log(contacts)
            console.log('Refresh contacts')
            window.localStorage.setItem('contacts', JSON.stringify(contacts))

    }, [contacts])


    const addNewContact = (data) => {
        const { name, number } = data;
        
        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        const normalizeNewContactName = name.toLowerCase();
        const findName = contacts.find(contact => contact.name.toLowerCase() === normalizeNewContactName);
        
        if (findName) {
            return alert(`${name} is already in contacts.`);
        }

        setContacts(( contacts ) => [  newContact, ...contacts] );
    }

    const changeFilter = (event) => {
            setFilter(event.currentTarget.value)
    }

    const getVisibleContacts = () => {
        const normalizeContactName = filter.toLowerCase();

        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeContactName))
    }

    const removeContact = (contactId) => { 
        setContacts(contacts.filter(contact => contact.id !== contactId))
    }

    const visibleFilterItems = getVisibleContacts();

        return(
            <>
                <h1>Phonebook</h1>

                <Form onFormSubmit={addNewContact} />   
        
                <Filter value={filter} onChangeFilter={changeFilter} />

                <ContactList contacts={visibleFilterItems} onRemoveContact={removeContact } />
        </>
        
    )
}



// export class App extends React.Component {

//     state = {
        // contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        //     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        //     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
//         filter: '',
//     }
//     // При першому завантаженні додатку - стадія Монтування
//     componentDidMount() {
        // const contacts = localStorage.getItem('contacts');
        // const parseContacts = JSON.parse(contacts);

        // if (parseContacts) {
        //     this.setState({contacts: parseContacts})
        // }
//     }
//     // при оновленні додатку - стадія Оновлення
//     componentDidUpdate(prevProps, prevState) {
        // console.log(prevState)
        // console.log(this.state)
        // if (this.state.contacts !== prevState.contacts) {
        //     console.log('Refresh contacts')
        //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        // }
//     }

    // addNewContact = (data) => {
    //     const { name, number } = data;
        
    //     const newContact = {
    //         id: nanoid(),
    //         name,
    //         number,
    //     };

    //     const normalizeNewContactName = name.toLowerCase();
    //     const findName = this.state.contacts.find(contact => contact.name.toLowerCase() === normalizeNewContactName);
        
    //     if (findName) {
    //         return alert(`${name} is already in contacts.`);
    //     }

    //     this.setState(({ contacts }) => ({
    //         contacts: [  newContact, ...contacts],
    //     }));
    // }

    // changeFilter = (event) => {
    //         this.setState({filter: event.currentTarget.value})
    // }

    // getVisibleContacts = () => {
    //     const normalizeContactName = this.state.filter.toLowerCase();

    //     return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizeContactName))
    // }

    // removeContact = (contactId) => { 
    //     this.setState(prevState => ({
    //         contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    //     }))
    // }


//     render() {

    //     const visibleFilterItems = this.getVisibleContacts();

    //     return(
    //         <>
    //             <h1>Phonebook</h1>

    //             <Form onFormSubmit={ this.addNewContact} />   
        
    //             <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />

    //             <ContactList contacts={visibleFilterItems} onRemoveContact={this.removeContact } />
    //     </>
        
    // )}
// }
