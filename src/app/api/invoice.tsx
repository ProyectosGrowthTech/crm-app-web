export async function getInvoices(page = 0, pageSize = 10) {
  try {
    const url = `http://localhost:8082/v1/invoice/?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
