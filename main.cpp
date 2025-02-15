#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <regex>

using namespace std;

const vector<string> facs = { "Khoa Luật", "Khoa Tiếng Anh thương mại", "Khoa Tiếng Nhật", "Khoa Tiếng Pháp" };

const vector<string> stats = { "Đang học", "Đã tốt nghiệp", "Đã thôi học", "Tạm dừng học" };

struct Student {
    string id;
    string name;
    string dob;
    string gender;
    string fac;
    string course;
    string prog;
    string addr;
    string email;
    string phone;
    string stat;
};

bool goodEmail(const string& email) {
    const regex p( "(\\w+)(\\.|_)?(\\w*)@(\\w+)(\\.(\\w+))+" );
    return regex_match(email, p);
}

bool goodPhone(const string& phone) {
    const regex p( "(0[3|5|7|8|9])+([0-9]{8})\\b" );
    return regex_match(phone, p);
}

bool goodFac(const string& fac) {
    return find(facs.begin(), facs.end(), fac) != facs.end();
}

bool goodStat(const string& stat) {
    return find(stats.begin(), stats.end(), stat) != stats.end();
}

void add(vector<Student>& studs) {
    Student s;
    cout << "New student:\n";

    cout << "ID: "; cin >> s.id;
    cin.ignore(); 
    cout << "Name: "; getline(cin, s.name);
    cout << "DOB (dd/mm/yyyy): "; getline(cin, s.dob);
    cout << "Gender: "; getline(cin, s.gender);
    
    do {
        cout << "Faculty (" ;
        for (int i = 0; i < facs.size(); ++i) {
             cout << facs[i];
             if(i != facs.size() - 1) {
                 cout << ", ";
             }
        }
         cout << "): ";
        getline(cin, s.fac);
    } while(!goodFac(s.fac));

    cout << "Course: "; getline(cin, s.course);
    cout << "Program: "; getline(cin, s.prog);
    cout << "Address: "; getline(cin, s.addr);

    do {
        cout << "Email: ";
        getline(cin, s.email);
    } while (!goodEmail(s.email));

    do {
        cout << "Phone: ";
        getline(cin, s.phone);
    } while (!goodPhone(s.phone));

    do {
        cout << "Status (" ;
        for (int i = 0; i < stats.size(); ++i) {
             cout << stats[i];
             if(i != stats.size() - 1) {
                 cout << ", ";
             }
        }
         cout << "): ";
        getline(cin, s.stat);
    } while (!goodStat(s.stat));

    studs.push_back(s);
    cout << "Done!\n";
}

int findById(const vector<Student>& studs, const string& id) {
    for (int i = 0; i < studs.size(); ++i) {
        if (studs[i].id == id) return i;
    }
    return -1;
}

void del(vector<Student>& studs) {
    string id;
    cout << "Enter ID to delete: "; cin >> id;
    int i = findById(studs, id);
    if (i != -1) {
        studs.erase(studs.begin() + i);
        cout << "Deleted!\n";
    } else {
        cout << "Not found.\n";
    }
}

void update(vector<Student>& studs) {
    string id;
    cout << "Enter ID to update: "; cin >> id;
    int i = findById(studs, id);
    if (i != -1) {
        cout << "New info:\n";

        cin.ignore();
        cout << "Name: "; getline(cin, studs[i].name);
        cout << "DOB (dd/mm/yyyy): "; getline(cin, studs[i].dob);
        cout << "Gender: "; getline(cin, studs[i].gender);
        
        do {
            cout << "Faculty (" ;
            for (int j = 0; j < facs.size(); ++j) {
                cout << facs[j];
                if(j != facs.size() - 1) {
                    cout << ", ";
                }
            }
            cout << "): ";
            getline(cin, studs[i].fac);
        } while(!goodFac(studs[i].fac));
        
        cout << "Course: "; getline(cin, studs[i].course);
        cout << "Program: "; getline(cin, studs[i].prog);
        cout << "Address: "; getline(cin, studs[i].addr);

        do {
            cout << "Email: ";
            getline(cin, studs[i].email);
        } while (!goodEmail(studs[i].email));

        do {
            cout << "Phone: ";
            getline(cin, studs[i].phone);
        } while (!goodPhone(studs[i].phone));
        
        do {
            cout << "Status (" ;
            for (int j = 0; j < stats.size(); ++j) {
                cout << stats[j];
                if(j != stats.size() - 1) {
                    cout << ", ";
                }
            }
            cout << "): ";
            getline(cin, studs[i].stat);
        } while (!goodStat(studs[i].stat));

        cout << "Updated!\n";
    } else {
        cout << "Not found.\n";
    }
}

void search(const vector<Student>& studs) {
    int c;
    cout << "Search by:\n1. ID\n2. Name\nChoice: ";
    cin >> c;
    if (c == 1) {
        string id;
        cout << "Enter ID: "; cin >> id;
        int i = findById(studs, id);
        if (i != -1) {
            cout << "Found:\n";
            cout << "ID: " << studs[i].id << "\nName: " << studs[i].name << "\nDOB: " << studs[i].dob << "\n";
            cout << "Gender: " << studs[i].gender << "\nFac: " << studs[i].fac << "\n";
            cout << "Course: " << studs[i].course << "\nProg: " << studs[i].prog << "\n";
            cout << "Addr: " << studs[i].addr << "\nEmail: " << studs[i].email << "\n";
            cout << "Phone: " << studs[i].phone << "\nStat: " << studs[i].stat << "\n";
        } else {
            cout << "Not found.\n";
        }
    } else if (c == 2) {
        string name;
        cin.ignore();
        cout << "Enter name: "; getline(cin, name);
        bool found = false;
        for (const auto& s : studs) {
            if (s.name.find(name) != string::npos) {
                cout << "----------\n";
                cout << "ID: " << s.id << "\nName: " << s.name << "\nDOB: " << s.dob << "\n";
                cout << "Gender: " << s.gender << "\nFac: " << s.fac << "\n";
                cout << "Course: " << s.course << "\nProg: " << s.prog << "\n";
                cout << "Addr: " << s.addr << "\nEmail: " << s.email << "\n";
                cout << "Phone: " << s.phone << "\nStat: " << s.stat << "\n";
                found = true;
            }
        }
        if (!found) cout << "Not found.\n";
    } else {
        cout << "Invalid choice.\n";
    }
}

int main() {
    vector<Student> studs;
    int choice;

    do {
        cout << "\nMenu:\n";
        cout << "1. Add\n2. Delete\n3. Update\n4. Search\n0. Exit\n";
        cout << "Choice: ";
        cin >> choice;

        switch (choice) {
            case 1: add(studs); break;
            case 2: del(studs); break;
            case 3: update(studs); break;
            case 4: search(studs); break;
            case 0: cout << "Bye!\n"; break;
            default: cout << "Invalid choice.\n";
        }
    } while (choice != 0);

    return 0;
}