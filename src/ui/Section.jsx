function Section({ children, className = "" }) {
    return (
        <section className={`bg-white rounded-2xl text-[1.4rem] mb-6 shadow-sm border border-gray-100 overflow-hidden ${className}`}>
            {children}
        </section>
    )
}

export default Section
