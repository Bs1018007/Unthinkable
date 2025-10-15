#include<bits/stdc++.h>
using namespace std;

int gcd(int a,int b){
    if (b==0){
        return a;
    }
    return gcd(b,a%b);
}
void solve(int n,vector<int>&arr){
    for(int i=0;i<n;i++){
        cout<<n+1-arr[i]<<" ";
    }
    cout<<endl;
    /*vector<int>arr1 = arr;
    bool flag = true;
    while(flag){
        int count=0;
        for(int i=0;i<n;i++){
            if (gcd(arr[i]+arr1[i],arr[i+1]+arr1[i+1])>=3){
                count++;
            }
        }
        if (count==n){
            flag = false;
        }
        next_permutation(arr1.begin(),arr1.end());
    }
    for(int i=0;i<n;i++){
        cout<<arr1[i]<<" ";
    }
    cout<<endl;*/
}

int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        vector<int>arr(n);
        for(int i=0;i<n;i++){
            cin>>arr[i];
        }
        solve(n,arr);
    }
}