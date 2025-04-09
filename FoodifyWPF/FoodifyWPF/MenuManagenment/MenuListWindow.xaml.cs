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

namespace FoodifyWPF.MenuManagenment
{
    /// <summary>
    /// Interaction logic for MenuListWindow.xaml
    /// </summary>
    public partial class MenuListWindow : Window
    {
        private static List<Models.Menu> menus = new List<Models.Menu>();
        public HttpClient? client;
        public MenuListWindow()
        {
            client = MainWindow.sharedClient;
            InitializeComponent();
            LoadMenu();
            
        }

        private async Task LoadMenu()
        {
            try
            {
                string url = $"{client.BaseAddress}api/Menu";
                menus = await client.GetFromJsonAsync<List<Models.Menu>>(url);

            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }

        private async void LoadMenus_Click(object sender, RoutedEventArgs e)
        {
            await LoadMenu();
            dtgMenu.ItemsSource = menus;
        }

        private void MenuListDelete_Click(object sender, RoutedEventArgs e)
        {
            dtgMenu.ItemsSource = null;
        }
    }
}
