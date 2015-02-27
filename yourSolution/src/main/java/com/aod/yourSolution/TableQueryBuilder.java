package com.aod.yourSolution;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.aod.yourSolution.beans.User;

public class TableQueryBuilder {
	private static AmazonDynamoDBClient client = new AmazonDynamoDBClient(new AWSCredentials() {
		
		@Override
		public String getAWSSecretKey() {
			return "gwNadu+5NmQHnK5lGfxPE45QzZNmOSb0q3Et35Rw";
		}
		
		@Override
		public String getAWSAccessKeyId() {
			return "AKIAJJ5NZTEX7OEDO6YQ";
		}
	});

	private static TableQueryBuilder m_Instance = null;
	public static TableQueryBuilder Instance (){
		if(m_Instance == null){
			m_Instance = new TableQueryBuilder();
		}
		
		return m_Instance;
	}
	
	public static User getUser(String userID){
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		User user= mapper.load(User.class, "12345675");
		return user;
	}
	
	public static boolean updateUser(User user){
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		if(user != null){
			try{
				mapper.save(user);
				return true;
			}
			catch(Exception ex){
				return false;
			}
		}
		else{
			return false;
		}
	}
}
