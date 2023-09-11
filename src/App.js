import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import { Oval } from "react-loader-spinner";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const initialQuote = {
  text: 'Quote',
  author: 'Author'
};

function App() {

  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(true);

  const updateQuote = async () => {

    setLoading(true);

    const url = 'http://localhost:3001/get-data-from-external-api';
    const res = await fetch(url);
    const newQuote = await res.json();
    const { quote: text, author } = newQuote;
    setQuote({
      text,
      author
    })

    setLoading(false);
  };

  const addQuote = async (author, quote) => {
    try {
      const url = 'http://localhost:3001/add';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, quote }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success('Quote saved!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error('Error al agregar la cita');
      }
    } catch (error) {
      console.error('Error al agregar la cita:', error);
    }
  };


  useEffect(() => {
    updateQuote();
  }, []);

  return (
    <div className="app">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
      />
      
       {
        loading ? <Oval
          height={80}
          width={80}
          color="#2B2118"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#2B2118"
          strokeWidth={5}
          strokeWidthSecondary={5}

        /> : <Quote quote={quote} />
      }
      <div className="container-sm text-center">
        <div className="row-md">
          <button onClick={() => updateQuote()} >Get Another</button>

        </div>
        <div className="row-md">
          <button onClick={() => addQuote(quote.author, quote.text)} >Save</button>

        </div>
      </div>


     

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>

  );
}

export default App;
