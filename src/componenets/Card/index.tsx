const Card = (
    {
        name,
        email
    }: {
        name: string,
        email: string
    }
) => {
    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    )
};
export default Card;
