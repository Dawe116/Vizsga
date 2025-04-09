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

namespace FoodifyWPF.RestaurantManagement
{
    /// <summary>
    /// Interaction logic for ModifyRestaurant.xaml
    /// </summary>
    public partial class ModifyRestaurant : Window
    {
        private string logoFilePath;
        public HttpClient? client;
        private static List<Restaurant> restaurants = new List<Restaurant>();
        public ModifyRestaurant()
        {
            InitializeComponent();
            client = MainWindow.sharedClient;
            LoadRestaurantsAsync();
        }

        private async Task LoadRestaurantsAsync()
        {
            try
            {
                string url = $"{client.BaseAddress}api/Restaurant";
                restaurants = await client.GetFromJsonAsync<List<Restaurant>>(url);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az éttermek betöltésekor: {ex.Message}");
            }

            cbxRestaurants.DisplayMemberPath = "Id";
            cbxRestaurants.ItemsSource = restaurants;
        }

        private void cbxRestaurants_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cbxRestaurants.SelectedItem is Restaurant selectedrestaurant)
            {
                txbName.Text = selectedrestaurant.Name;
                txbDescription.Text = selectedrestaurant.Description;
                tbxCategory.Text = selectedrestaurant.Category;

            }
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
            if (cbxRestaurants.SelectedItem is Restaurant restbody)
            {
                try
                {
                    Restaurant newRestaurant = new()
                    {
                        Id = 0,
                        Name = txbName.Text,
                        Description = txbDescription.Text,
                        Category = tbxCategory.Text,
                        Logo = !string.IsNullOrEmpty(logoFilePath) ? File.ReadAllBytes(logoFilePath) : null
                    };

                    string toSend = JsonSerializer.Serialize(newRestaurant, JsonSerializerOptions.Default);
                    var content = new StringContent(toSend, Encoding.UTF8, "application/json");
                    var response = await client.PutAsync($"api/Restaurant/{MainWindow.uId}", content);
                    string rcontent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show(rcontent);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }


            }
        }



        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private async void DeleteRestaurant_Click(object sender, RoutedEventArgs e)
        {

            int restaurantId = (cbxRestaurants.SelectedValue as Restaurant).Id;

            MessageBoxResult result = MessageBox.Show(
                "Biztosan törölni szeretnéd ezt az éttermet??",
                "Megerősítés",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync($"api/Restaurant/{MainWindow.uId},{restaurantId}");

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Étterem sikeresen törölve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                        LoadRestaurantsAsync();
                    }
                    else
                    {
                        MessageBox.Show($"Hiba történt: {response.ReasonPhrase}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a szerverrel való kommunikáció során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
        

        private void Button_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
