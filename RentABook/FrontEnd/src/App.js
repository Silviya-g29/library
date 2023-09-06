import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import { LibraryProvider } from "./context";
//init frontend
function App() {
    return (
        <div className="App">
            <LibraryProvider>
                <Header />
                <Home />
                <Footer />
            </LibraryProvider>
        </div>
    );
}

export default App;
