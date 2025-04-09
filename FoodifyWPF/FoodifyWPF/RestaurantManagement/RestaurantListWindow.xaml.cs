using FoodifyWPF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace FoodifyWPF.RestaurantManagement
{
    /// <summary>
    /// Interaction logic for RestaurantList.xaml
    /// </summary>
    public partial class RestaurantList : Window
    {
        public HttpClient? client;
        private static List<Restaurant> restaurants = new List<Restaurant>();
        public RestaurantList()
        {
            InitializeComponent();
            client = MainWindow.sharedClient;
        }
        private async Task LoadRestaurant()
        {
            try
            {
                string url = $"{client.BaseAddress}api/Restaurant";
                restaurants = await client.GetFromJsonAsync<List<Restaurant>>(url);

                //Másik lehetőség:
                //var response = await client.GetAsync(url);
                //if (response.IsSuccessStatusCode)
                //{
                //    string content = await response.Content.ReadAsStringAsync();
                //    JsonSerializerOptions options = new JsonSerializerOptions
                //    {
                //        PropertyNameCaseInsensitive = true
                //    };
                //    users = JsonSerializer.Deserialize<List<User>>(content, options);
                //}
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }
        private async void LoadRestaurants_Click(object sender, RoutedEventArgs e)
        {
            await LoadRestaurant();
            dgrUserList.ItemsSource = restaurants;
        }
    }
}
