<template>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Temperature</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.Location }}</td>
            <td>{{ user.Temperature }}</td>
            <td>{{ user.Date }}</td>
          </tr>
          <!-- Extra rows for free space -->

        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          { id: 1, Location: 'Cardiff', Temperature: '30', Date: '11/05/2022' },
          { id: 2, Location: 'London', Temperature: '17', Date: '11/05/2022' },
          { id: 3, Location: 'Manchester', Temperature: '21', Date: '11/05/2022' },
          { id: 4, Location: 'Croydon', Temperature: '13', Date: '11/05/2022' },
          { id: 5, Location: 'Llaneli', Temperature: '27', Date: '11/05/2022' },
          { id: 6, Location: 'Llaneli', Temperature: '10', Date: '11/05/2022' },
          // Add more dummy data if needed
        ],
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  .table-container {
    margin: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  
    th {
      background-color: #f2f2f2;
    }
  }
  </style>
  