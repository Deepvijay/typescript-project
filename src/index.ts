import app from './app'
import { LoggerService } from './Logger/loggerService';
const PORT =8082;

app.listen(PORT,async ()=>{
        // LoggerService.Instance.init("test")
        console.log("server started at")
    LoggerService.Instance.info(`Server sarted on http://localhost:${PORT}`)
}).on('error',(e)=>{
    console.log(e.message.toString())
    LoggerService.Instance.error(e.message.toString())

})