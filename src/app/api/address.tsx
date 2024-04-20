import { Address } from "../types/address"

export async function postAddress(address: Address) {
  try {
    const url = 'http://localhost:8082/v1/address/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(address)
    });

    if (!response.ok) {
      throw new Error('Failed to post address');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error posting address:', error);
    throw error;
  }
}

export async function getAddresses(page = 0, pageSize = 10) {
  try {
    const url = `http://localhost:8082/v1/address/?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    console.log('API Response:', data); // Add this line to check the response data

    return data;
  } catch (error) {
    console.error('Error fetching data1:', error);
    throw error;
  }
}

export async function getAllAddresses() {
  try {
    const url = `http://localhost:8082/v1/address/all`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    console.log('API Response:', data); // Add this line to check the response data

    return data;
  } catch (error) {
    console.error('Error fetching data1:', error);
    throw error;
  }
}
