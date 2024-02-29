import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: any) => {
    // extract all data passed through post request
    const { userId, prompt, tag } = await req.json();

    try {
        // connect to the DB, it has to be done everytime as it is a lamda function and will shutdown once it does it's thing.
        await connectToDb();
        const newPrompt = new Prompt({
            creator: userId, 
            prompt,
            tag
        })

        // create new reesponse
        await newPrompt.save();

        //return the new response specify status 201 for created
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    } catch (error) {
        //500 for server error
        return new Response("Failed to create a new prompt", {status: 500})
    }
}