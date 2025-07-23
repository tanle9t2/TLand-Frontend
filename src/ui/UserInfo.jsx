function UserInfo() {
    return (
        <div className="flex items-center space-x-3">
            <img
                src="https://tland-bucket.s3.us-east-1.amazonaws.com/pain.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
            />
            <span className="ml-3 text-xl font-medium text-gray-800">John Doe</span>
        </div>
    )
}

export default UserInfo
