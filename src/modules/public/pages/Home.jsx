import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useCookie from "react-use-cookie";
import { useEffect } from "react";


const Home = () => {
    const navigate = useNavigate()

    const [token, setToken] = useCookie("my_token");

    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [])
    
    return (
        <main className="min-h-screen flex flex-col justify-between bg-background text-foreground">
            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col items-center text-center gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl font-bold tracking-tight">
                            Manage Your Invoices with Ease
                        </h2>
                        <p className="text-xl text-secondary">
                            Create, send, and track invoices in minutes. Get paid faster with our simple and powerful invoicing solution.
                        </p>
                    </div>

                    <Link
                        to="/register"
                        className="px-8 py-3 bg-primary text-background rounded-lg text-lg font-medium hover:opacity-90 transition inline-block"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default Home;
