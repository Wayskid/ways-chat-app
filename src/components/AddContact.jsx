import { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import MsgAppContext from '../context/MsgAppContext'

export default function AddContact() {

   const {
      handleShowcontactWindow, 
      contactWindowShown,
      newContactInfo,
      handleNewContactInput,
      handleSaveContact
   } = useContext(MsgAppContext)

   

  return (
    <div className={`newContactPopup ${contactWindowShown && "showAddNewContact"}`}>
      <div className="popupContent">
         <header className='newContactHead'>
            <h4>Add New Contact</h4>
            <FaTimes onClick={handleShowcontactWindow} className="closeNewContactBtn" />
         </header>
         <form className='newContactForm'>
            <input
               type="text"
               placeholder='Name'
               name='name'
               value={newContactInfo.name}
               onChange={handleNewContactInput}
            />
            <input
               type="number"
               placeholder='Phone Number'
               name='number'
               value={newContactInfo.number}
               onChange={handleNewContactInput}
            />
            <input
               type="email"
               placeholder='Email'
               name='email'
               value={newContactInfo.email}
               onChange={handleNewContactInput}
            />
            <button onClick={handleSaveContact}>Save Contact</button>
         </form>
      </div>
    </div>
  )
}
