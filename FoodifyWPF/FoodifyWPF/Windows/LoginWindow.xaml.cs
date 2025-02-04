using FoodifyWPF.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
            try
            {
                var response = await client.PostAsync($"api/Login/SaltRequest/{tbxUsername.Text}", new StringContent(tbxUsername.Text, Encoding.UTF8, "text/plain"));

                string salt = await response.Content.ReadAsStringAsync();

                string tmpHash = MainWindow.CreateSHA256(tbxPassword.Password + salt);

                //MessageBox.Show($"{salt} \n {tmpHash}");

                LoginDTO dtoUser = new LoginDTO()
                {
                    LoginName = tbxUsername.Text,
                    TmpHash = tmpHash
                };

                string felhAdatok = JsonSerializer.Serialize(dtoUser, JsonSerializerOptions.Default);

                var body = new StringContent(felhAdatok, Encoding.UTF8, "application/json");
                var valasz = await client.PostAsync("api/Login", body);
                var content = await valasz.Content.ReadAsStringAsync();
                //MessageBox.Show(content);

                LoggedUser loggedIn = JsonSerializer.Deserialize<LoggedUser>(content, JsonSerializerOptions.Default);
                

                string[] darabok = content.Split('"');
                string tokenem = darabok[darabok.Length - 2];
                //MessageBox.Show(tokenem);
                MainWindow.uId = tokenem;
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void Cancel_Clcik(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
