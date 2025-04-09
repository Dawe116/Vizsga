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
    /// Interaction logic for MenuModifyWindow.xaml
    /// </summary>
    public partial class MenuModifyWindow : Window
    {
        private string logoFilePath;
        public HttpClient? client;
        private static List<Models.Menu> menus = new List<Models.Menu>();
        public MenuModifyWindow()
        {
            client = MainWindow.sharedClient;
            InitializeComponent();
            LoadMenus();
        }

        private async void LoadMenus()
        {
            try
            {
                string url = $"{client.BaseAddress}api/Menu";
                menus = await client.GetFromJsonAsync<List<Models.Menu>>(url);
                cbxId.DisplayMemberPath = "Id";
                cbxId.ItemsSource = menus;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a menük betöltésekor: " + ex.Message);
            }
        }
        private async void Modosit_Click(object sender, RoutedEventArgs e)
        {
            Models.Menu menu = cbxId.SelectedItem as Models.Menu;
            menu.Name = txbName.Text;
            menu.Description = txbDescription.Text;
            menu.Price = int.Parse(txbPrice.Text);
            menu.Picture = File.ReadAllBytes(logoFilePath);

            try
            {
                string toSend = JsonSerializer.Serialize(menu, JsonSerializerOptions.Default);
                var content = new StringContent(toSend, Encoding.UTF8, "application/json");
                var response = await client.PutAsync($"api/Menu/${MainWindow.uId}", content);
                string rcontent = await response.Content.ReadAsStringAsync();
                MessageBox.Show(rcontent);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private async void Delete_Click(object sender, RoutedEventArgs e)
        {
            int menuid = (cbxId.SelectedValue as Models.Menu).Id;

            MessageBoxResult result = MessageBox.Show(
                "Biztosan törölni szeretnéd ezt a felhasználót?",
                "Megerősítés",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync($"api/Menu/{MainWindow.uId},{menuid}");

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Menü sikeresen törölve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                        LoadMenus();
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
        

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void cbxId_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cbxId.SelectedItem is Models.Menu selectedMenu)
            {
                txbName.Text = selectedMenu.Name;
                txbDescription.Text = selectedMenu.Description;
                txbPrice.Text = selectedMenu.Price.ToString();
            }
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
