using FoodifyWPF.Models;
using System;
using System.Collections.Generic;
using System.IO;
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

namespace FoodifyWPF.UserManagemant
{
    /// <summary>
    /// Interaction logic for NewUserWindow.xaml
    /// </summary>
    public partial class NewUserWindow : Window
    {
        public HttpClient? client;
        public NewUserWindow()
        {
            InitializeComponent();
            client = MainWindow.sharedClient;
            string currentDir = Directory.GetCurrentDirectory();
            imgProfilePics.Source = new BitmapImage(new Uri(currentDir + "/images/default.jpg",UriKind.Absolute));
            tbProfilPics.Text = $"default.jpg";
        }

        private async void Save_Click(object sender, RoutedEventArgs e)
        {
            string salt = MainWindow.GenerateSalt();
            if (txbUsername.Text is not null &&
                txbFullName.Text is not null &&
                pbxPass1.Password is not null &&
                pbxPass2.Password is not null &&
                txbEmail.Text is not null &&
                cbxPermission is not null)
            {
                string ujhash = MainWindow.CreateSHA256(MainWindow.CreateSHA256(pbxPass1.Password + salt));
                try
                {
                    User newUser = new()
                    {
                        Id = 0,
                        LoginNev = txbUsername.Text,
                        Name = txbFullName.Text,
                        Salt = salt,
                        Hash = ujhash,
                        PermissionId = 9,//(int)cbxPermission.SelectedValue,
                        Active = cbActive.IsChecked == true,
                        Email = txbEmail.Text,
                        ProfilePicturePath = tbProfilPics.Text

                    };

                    string toSend = JsonSerializer.Serialize(newUser, JsonSerializerOptions.Default);
                    var content = new StringContent(toSend, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync($"api/User/{MainWindow.uId}?token={MainWindow.uId}", content);
                    string rcontent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show(rcontent);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
            else { MessageBox.Show("Minden mezőt ki kell tölteni!"); }
            Close();
        }

        private void ImageSelect_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
