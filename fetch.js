/**
 * Fetches JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 *
 * @returns {Object} response json data
 */
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Heittää virheen, joka sisältää sekä HTTP-statukoodin että statusviestin
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    // Logataan virhe konsoliin ja heitetään virhe eteenpäin
    console.error('fetchData() error', error);
    throw error; // Heittää virheen eteenpäin kutsuvalle funktiolle
  }
};

export { fetchData };