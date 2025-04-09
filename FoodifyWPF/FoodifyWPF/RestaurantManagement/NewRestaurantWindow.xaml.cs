using FoodifyWPF.Models;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
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
using System.Xml.Linq;

namespace FoodifyWPF.RestaurantManagement
{
    /// <summary>
    /// Interaction logic for NewRestaurantWindow.xaml
    /// </summary>
    public partial class NewRestaurantWindow : Window
    {
        private string logoFilePath;
        public HttpClient? client;
        private static List<Restaurant> restaurants = new List<Restaurant>();
        public NewRestaurantWindow()
        {
            InitializeComponent();
            client = MainWindow.sharedClient;
        }

        private void UploadLogo_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Title = "Kép kiválasztása",
                Filter = "Képfájlok|*.jpg;*.jpeg;*.png;*.bmp"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                logoFilePath = openFileDialog.FileName;
                imgLogo.Source = new BitmapImage(new Uri(logoFilePath));
            }
        }


        private async void Save_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                Restaurant newRestaurant = new()
                {
                    Id = 0,
                    Name = txbName.Text,
                    Description = txbDescription.Text,
                    Category = txbCategory.Text,
                    Logo = File.ReadAllBytes(logoFilePath)
                };

                string toSend = JsonSerializer.Serialize(newRestaurant, JsonSerializerOptions.Default);
                var content = new StringContent(toSend, Encoding.UTF8, "application/json");
                var response = await client.PostAsync($"api/Restaurant/{MainWindow.uId}", content);
                string rcontent = await response.Content.ReadAsStringAsync();
                MessageBox.Show(rcontent);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
