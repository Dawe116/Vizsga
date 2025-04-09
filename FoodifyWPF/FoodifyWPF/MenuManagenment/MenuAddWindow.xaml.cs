using FoodifyWPF.Models;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
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

namespace FoodifyWPF.MenuManagenment
{
    /// <summary>
    /// Interaction logic for MenuAddWindow.xaml
    /// </summary>
    public partial class MenuAddWindow : Window
    {
        private string logoFilePath;
        public HttpClient? client;
        private static List<Models.Menu> menus = new List<Models.Menu>();
        public MenuAddWindow()
        {
            client = MainWindow.sharedClient;
            InitializeComponent();
            LoadRestaurantId();

        }
        private async void LoadRestaurantId()
        {
            try
            {
                string url = $"{client.BaseAddress}api/Restaurant";
                menus = await client.GetFromJsonAsync<List<Models.Menu>>(url);
                cbxRestaurantId.DisplayMemberPath = "Id";
                cbxRestaurantId.ItemsSource = menus;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a menük betöltésekor: " + ex.Message);
            }
        }

        private async void Add_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                Models.Menu newMenu = new()
                {
                    Id = 0,
                    Name = txbName.Text,
                    Description = txbDescription.Text,
                    Price = int.Parse(txbPrice.Text),
                    Picture = File.ReadAllBytes(logoFilePath),
                    RestaurantId = cbxRestaurantId.SelectedIndex + 1

                };

                string toSend = JsonSerializer.Serialize(newMenu, JsonSerializerOptions.Default);
                var content = new StringContent(toSend, Encoding.UTF8, "application/json");
                var response = await client.PostAsync($"api/Menu/{MainWindow.uId}", content);
                string rcontent = await response.Content.ReadAsStringAsync();
                MessageBox.Show(rcontent);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void KepHozzadAd_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Title = "Kép kiválasztása",
                Filter = "Képfájlok|*.jpg;*.jpeg;*.png;*.bmp"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                logoFilePath = openFileDialog.FileName;
                imgMenu.Source = new BitmapImage(new Uri(logoFilePath));
            }
        }


    }
}
