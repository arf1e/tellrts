import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contacts from '../../screens/Contacts';
import Contact from '../../screens/Contact/Contact';
import Chat from '../../screens/Chat';

const ContactsStackNavigator = createNativeStackNavigator();

export const CONTACT_LIST = 'Contact List';
export const CONTACT = 'Contact';
export const CHAT = 'Chat';

const ContactsNavigator = () => (
  <ContactsStackNavigator.Navigator>
    <ContactsStackNavigator.Screen
      name={CONTACT_LIST}
      component={Contacts}
      options={{header: () => null}}
    />
    <ContactsStackNavigator.Screen
      name={CONTACT}
      component={Contact}
      options={{header: () => null}}
    />
    <ContactsStackNavigator.Screen
      name={CHAT}
      component={Chat}
      options={{
        header: () => null,
      }}
    />
  </ContactsStackNavigator.Navigator>
);

export default ContactsNavigator;
