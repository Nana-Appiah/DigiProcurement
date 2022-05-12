using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Diagnostics;
using DigiProc;

namespace DigiProc.Helpers
{
    public interface ILogger
    {
        void WriteLog();
    }

    public class Log : ILogger
    {

        private ProcurementDbEntities config = new ProcurementDbEntities();
        public int Id { get; set; }
        public string Entity { get; set; }
        public string Event { get; set; }
        public string Description { get; set; }
        public string Actor { get; set; }
        public void WriteLog()
        {
            //method writes an action to the log table
            try
            {
                var objLog = new Logger() { 
                    LogEntity = Entity,
                    LogEvent = Event,
                    LogDescription = Description,
                    LogActor = Actor
                };

                config.Loggers.Add(objLog);
                config.SaveChanges();
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
            }
        }


    }
}