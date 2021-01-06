
import redis from 'redis';

const client = redis.createClient({
    port:6379,
    host:'127.0.0.1'
});


client.on("connect",()=>{
    console.log("redis connected Successfully")
})

client.on('error',(err)=>{
    console.log(err.message)
})

export default client

