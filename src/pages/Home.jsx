export default function Home() {

    return (
        <div>
            {/* Hero Section */}
            <section
                id="home"
                style={{ background: "#f8f8f8", padding: "100px 0" }}
            >
                <div style={{ textAlign: "center" }}>
                    <h1>Welcome to RayStore</h1>
                    <p>Your Destination for Quality Shopping</p>
                    <button
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            marginTop: "20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        Explore Now
                    </button>
                </div>
            </section>

            {/* Mission Section */}
            <section id="mission" style={{ padding: "50px 0" }}>
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <h2>Our Mission</h2>
                    <p>
                        At RayStore, we are on a mission to provide our
                        customers with a seamless and enjoyable shopping
                        experience. We aim to offer a diverse range of
                        high-quality products, exceptional customer service, and
                        a platform that understands and anticipates your needs.
                    </p>
                </div>
            </section>

            {/* About Us Section */}
            <section
                id="about"
                style={{ background: "#f8f8f8", padding: "50px 0" }}
            >
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <h2>About Us</h2>
                    <p>
                        RayStore is more than just an online store; we are a
                        community of passionate individuals dedicated to
                        bringing you the best in fashion, technology, home
                        essentials, and more. With a commitment to quality and
                        innovation, we strive to be your go-to destination for
                        all your shopping needs.
                    </p>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" style={{ padding: "50px 0" }}>
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <h2>Contact Us</h2>
                    <p>
                        Have questions or need assistance? Our customer support
                        team is here to help! Reach out to us via email at
                        support@raystore.com or give us a call at +1 (123)
                        456-7890.
                    </p>
                </div>
            </section>
        </div>
    );
}
