import Header from './Header'
import Footer from './Footer'

export default function MainLayout({ children }: any) {
    return (
        <main className='mainLayout'>
            <Header />
            <div className='mainLayout__content'>
                {children}
            </div>
            <Footer />
        </main>
    )
}
