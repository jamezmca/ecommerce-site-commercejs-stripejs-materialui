import './styles.css'


const Footer = () => {
    const date = new Date()
    const fullYear = date.getFullYear()

    return (
        <footer className="footer">
            <p>All &copy; copy rights are reserved to Careclothes {fullYear}</p>
        </footer>
    )
}

export default Footer
