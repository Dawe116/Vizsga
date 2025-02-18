using FoodifyWPF.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security;
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
    /// Interaction logic for UserModifyWindow.xaml
    /// </summary>
    public partial class UserModifyWindow : Window
    {
        public HttpClient? client;
        private static List<Permission> permissions = new List<Permission>();
        private static List<User> users = new List<User>();

        public UserModifyWindow()
        {
            InitializeComponent();
            client = MainWindow.sharedClient;
            LoadUserDataAndPermission();
        }

        private async void LoadUserDataAndPermission()
        {
            try
            {

                string url = $"{client.BaseAddress}api/User/{MainWindow.uId}?token={MainWindow.uId}";
                users = await client.GetFromJsonAsync<List<User>>(url);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a felhasználó betöltésekor: {ex.Message}");
            }
            try
            {
                string url = $"{client.BaseAddress}api/Permission/{MainWindow.uId}?token={MainWindow.uId}";
                permissions = await client.GetFromJsonAsync<List<Permission>>(url);
            }
            catch(Exception ex)
            {
                MessageBox.Show($"Hiba a jogosultságok betöltésekor: {ex.Message}");
            }
            cbxUsers.DisplayMemberPath = "Id";
            cbxUsers.ItemsSource = users;
            cbxPermission.DisplayMemberPath = "Szint";
            cbxPermission.ItemsSource = permissions;
        }

        private async void Save_Click(object sender, RoutedEventArgs e)
        {

            User nev= cbxUsers.SelectedItem as User;
            nev.LoginNev = txbUsername.Text;
            nev.Name = txbFullName.Text;
            nev.Email = txbEmail.Text;
            nev.PermissionId = Convert.ToInt32(cbxPermission.SelectedItem);
            
            try
            {
                string toSend = JsonSerializer.Serialize(nev,JsonSerializerOptions.Default);
                var content = new StringContent(toSend, Encoding.UTF8, "application/json");
                var response = await client.PutAsync($"api/User/{MainWindow.uId}?token={MainWindow.uId}", content);
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

        private void ImageSelect_Click(object sender, RoutedEventArgs e)
        {

        }

        private async void DeleteUser_Click(object sender, RoutedEventArgs e)
        {

            int userId = (cbxUsers.SelectedValue as User).Id;

            MessageBoxResult result = MessageBox.Show(
                "Biztosan törölni szeretnéd ezt a felhasználót?",
                "Megerősítés",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync($"api/User/{MainWindow.uId},{userId}");

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Felhasználó sikeresen törölve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                        LoadUserDataAndPermission();
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


        private async void cbxUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {


                if (cbxUsers.SelectedItem is User selectedUser)
                {
                    txbUsername.Text = selectedUser.LoginNev;
                    txbEmail.Text = selectedUser.Email;
                    txbFullName.Text = selectedUser.Name;
                    cbxPermission.SelectedItem = selectedUser.PermissionId;
                }
            
            

                
        }
    }
}