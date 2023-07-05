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
