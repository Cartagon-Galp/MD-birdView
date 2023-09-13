

export async function queryMonday(query) {
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const response = await fetch("https://api.monday.com/v2", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': API_KEY,
          'API-Version': '2023-04'
        },
        body: JSON.stringify({
          query
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
}