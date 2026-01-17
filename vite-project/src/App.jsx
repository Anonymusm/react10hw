import ContactContainer from "./components/ContactContainer/ContactContainer";
import ContactContext from "./components/ContactContext";

export default function App() {
  return (
    <>
      <ContactContext>
        <ContactContainer />
      </ContactContext>
    </>
  );
}
