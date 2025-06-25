
export default function UserAvatar({ email }) {
    const getInitials = (email) => {
        if (!email) return "👤";
        return email[0].toUpperCase();
    };

    return (
        <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#333",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1rem"
        }}>
            {getInitials(email)}
        </div>
    );
}