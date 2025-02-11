using FoodifyWPF.Models;
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
            LoadUserData();
        }

        private async void LoadUserData()
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
            cbxUsers.DisplayMemberPath = "Id";
            cbxUsers.ItemsSource = users;
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

        private void DeleteUser_Click(object sender, RoutedEventArgs e)
        {

        }

        private async void cbxUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {


                if (cbxUsers.SelectedItem is User selectedUser)
                {
                    txbUsername.Text = selectedUser.LoginNev;
                    txbEmail.Text = selectedUser.Email;
                    txbFullName.Text = selectedUser.Name;
                cbxPermission.Items.Add("9");
                    cbxPermission.SelectedItem = (selectedUser.PermissionId);
                }
            
            

                
        }
    }
}