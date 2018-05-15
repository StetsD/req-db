main(){
	create_db
}

create_db(){
	psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
		REATE DATABASE building;
	EOSQL
}

main "$@"
