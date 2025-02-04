using FoodifyWPF.Models;
using FoodifyWPF.Windows;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace FoodifyWPF.UserManagemant
{
    /// <summary>
    /// Interaction logic for ListWindow.xaml
    /// </summary>
    public partial class ListWindow : Window
    {
        public HttpClient? client;
        private static List<User> users = new List<User>();
        public ListWindow()
        {
            InitializeComponent();
            client = MainWindow.sharedClient;
        }

        private async Task LoadUsers()
        {
            try
            {
                string url = $"{client.BaseAddress}api/User/{MainWindow.uId}?token={MainWindow.uId}";
                users = await client.GetFromJsonAsync<List<User>>(url);

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

        private async void LoadUser_Click(object sender, RoutedEventArgs e)
        {
            await LoadUsers();
            dgrUserList.ItemsSource = users;
        }
    }
}
