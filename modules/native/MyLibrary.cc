#include <algorithm>
#include <node.h>
#include <v8.h>
#include <string>
#include <vector>


using namespace v8;
using namespace std;

struct SumReq {
	vector <int> numbers;
	int result;
	Persistent<Function> callback;
};


void Worker(uv_work_t* work)
{
	
	SumReq * req = (SumReq*)work->data;
    int sum = 0;
	for (vector<int>::iterator it = req->numbers.begin(); it != req->numbers.end(); ++it) {
   		sum += *it;
    }
	req->result = sum;
}

void After(uv_work_t* work, int status)
{
	HandleScope scope;

    SumReq* request = (SumReq*)work->data;
    delete work;

	Handle<Value> argv[1] = { Integer::New(request->result) };
    
	request->callback->Call(Context::GetCurrent()->Global(), 1, argv);
    request->callback.Dispose();
    delete request;
}

Handle<Value> CalcAsync(const Arguments& args) {

	Local<Function> callback = Local<Function>::Cast(args[1]);
	Local<Array>	numbers  = Local<Array>::Cast(args[0]);

	SumReq * req = new SumReq;
	req->callback = Persistent<Function>::New(callback);

	for (size_t i = 0; i < numbers->Length(); i++) {
		req->numbers.push_back(numbers->Get(i)->Int32Value());
	}
	
	
	uv_work_t * work = new uv_work_t;
    work->data = req;
	
	uv_queue_work(uv_default_loop(), work, Worker, After);
	return Undefined();
}

Handle<Value> CustomUpperCase(const Arguments& args) {
	HandleScope scope;
	String::Utf8Value param(args[0]->ToString());

	std::string str = std::string(*param);
	std::transform(str.begin(), str.end(),str.begin(), ::toupper);

	return scope.Close(String::New(str.c_str()));
}

void init(Handle<Object> exports) {
	exports->Set(String::NewSymbol("ToUpperCase"), FunctionTemplate::New(CustomUpperCase)->GetFunction());
	exports->Set(String::NewSymbol("CalcAsync"), FunctionTemplate::New(CalcAsync)->GetFunction());
}

NODE_MODULE(MyLibrary, init)