using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

namespace FoodifyWPF.Windows
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public HttpClient client;
        public LoginWindow()
        {
            InitializeComponent();
        }

        private async void Login_Click(object sender, RoutedEventArgs e)
        {
            var response = await client.PostAsync($"api/Login/SaltRequest/{tbxUsername.Text}", new StringContent(tbxUsername.Text, Encoding.UTF8, "text/plain"));

            string salt = await response.Content.ReadAsStringAsync();
            MessageBox.Show(salt);
        }

        private void Cancel_Clcik(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
