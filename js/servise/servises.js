const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    });
    return await res.json();
};

const getResurs = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Ты лох");
    }
    return await res.json();
};


export {postData};
export {getResurs};