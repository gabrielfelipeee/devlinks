import Card from "../../componenets/Card";
import useFetchUsers from "../../hooks/useFetchUsers";

interface user {
    name: string,
    email: string
}

const Home = () => {
    const { users } = useFetchUsers();
    return (
        <div>
            <h1>HOME</h1>
            {/*
                users?.map((user: user) => {
                    return <Card key={user.email} email={user.email} name={user.name} />
                })
           */ }
        </div>
    )
};
export default Home;
