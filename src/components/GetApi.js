import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostData() {
  const [accessToken, setAccessToken] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getToken() {
      const tokenData = {
        client_id: 'HNEVk9jcrFQ4VWnqtxHkSp8SYRu7hcb0',
        client_secret: 'ewc4cc19zrAUKL7DZLoNZl10XdZ4LO6rqilAnK1d',
        grant_type: 'client_credentials'
      };

      try {
        const tokenResponse = await axios.post('https://developers.syscom.mx/oauth/token', tokenData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        console.log('Token obtained:', tokenResponse.data.access_token);
        setAccessToken(tokenResponse.data.access_token);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    getToken();
  }, []);


      async function fetchCategories() {
        try {
          const categoriesResponse = await axios.get('https://developers.syscom.mx/api/v1/categorias', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log('Categories obtained:', categoriesResponse.data);
          setCategories(categoriesResponse.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }

      fetchCategories();

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostData;