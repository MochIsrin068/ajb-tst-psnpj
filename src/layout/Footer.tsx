
export default function Footer() {
    const date = new Date()

    return (
        <div className='mainLayout__footer'>
            <p>
                &copy; Muhammad Isrim {date.getFullYear()}
            </p>
        </div>
    )
}
