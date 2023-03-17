export function useTable() {
    const date = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    const generalCount = (members) => {
        let total = 0;
        for (let i = 0; i < members.length; i++) {
            total += members[i].count;
        }
        return total;
    };

    const telegramLink = (username) => {
        return `https://t.me/${username}`;
    };

    return {
        date,
        generalCount,
        telegramLink,
    }
}