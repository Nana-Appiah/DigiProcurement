using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

using System.Configuration;
using System.Diagnostics;
using System.Threading.Tasks;
using DigiProc.Notif;
using System.Text;
using Newtonsoft.Json;

namespace DigiProc.Helpers
{
    public class ApiServer
    {
        string baseURI = ConfigurationManager.AppSettings["api"].ToString();
        public string ApiParams { get; set; }

        public string ApiRequest()
        {
            string final = string.Empty;

            try
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseURI);

                //adding an accept header for json format
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //serialize here
                
                //list data response
                HttpContent c = new StringContent(ApiParams, System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(baseURI, c).Result;
                if (response.IsSuccessStatusCode)
                {
                    using (HttpContent content = response.Content)
                    {
                        final = response.StatusCode.ToString();
                    }
                }

                return final;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return String.Empty;
            }
        }


        public bool ApiMailRequest(Message msg)
        {
            try
            {
                HttpClient client = new HttpClient();
                baseURI = ConfigurationManager.AppSettings["marathon_api"].ToString();
                client.BaseAddress = new Uri(baseURI);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var stringPayload = JsonConvert.SerializeObject(msg);
                var content = new StringContent(stringPayload, Encoding.UTF8, "application/json");

                //HttpContent c = new StringContent(ApiParams, System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(baseURI, content).Result;

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else { return false; }
            }
            catch (Exception x)
            {
                Debug.Print(x.Message);
                return false;
            }
        }

    }
}